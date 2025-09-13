import React, { useState } from 'react';
import clasNam from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { ProductList } from './component/ProductList/productList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortSize {
  start,
  ByName = 'alphabetically',
  ByLength = 'length',
}

enum Reverse {
  no,
  yes = 'reverse',
}

function getSortedGoods(
  list: string[],
  sortProduct: SortSize,
  reverse: Reverse,
): string[] {
  const newGoodList = [...list];

  if (sortProduct) {
    newGoodList.sort((poz1, poz2) => {
      switch (sortProduct) {
        case SortSize.ByName:
          return poz1.localeCompare(poz2);

        case SortSize.ByLength:
          return poz1.length - poz2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse === 'reverse') {
    newGoodList.reverse();
  }

  return newGoodList;
}

export const App: React.FC = () => {
  const [sortProduct, setSortProduct] = useState(SortSize.start);
  const [reverse, setReverse] = useState(Reverse.no);

  const visibleProduct = getSortedGoods(goodsFromServer, sortProduct, reverse);

  const coincidence =
    visibleProduct.length === goodsFromServer.length &&
    visibleProduct.every((g, i) => g === goodsFromServer[i]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={clasNam('button is-info', {
            'is-light': sortProduct !== 'alphabetically',
          })}
          onClick={() => setSortProduct(SortSize.ByName)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={clasNam('button is-success', {
            'is-light': sortProduct !== 'length',
          })}
          onClick={() => setSortProduct(SortSize.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={clasNam('button is-warning', {
            'is-light': reverse !== 'reverse',
          })}
          onClick={() =>
            setReverse(ch => (ch !== Reverse.yes ? Reverse.yes : Reverse.no))
          }
        >
          Reverse
        </button>

        {!coincidence && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortProduct(SortSize.start);
              setReverse(Reverse.no);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ProductList products={visibleProduct} />
    </div>
  );
};
