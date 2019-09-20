import CONDITIONS_LIST from './list.conditions';
import LANGUAGES_LIST from './list.languages';
import CATEGORIES_LIST from './list.categories';
import CURRENCIES_LIST from './list.currencies';
import REASONS_LIST from './list.reasons';
import BLOCK_REASONS_LIST from './list.block-reasons';

const INITIAL_STATE = {
  conditions: CONDITIONS_LIST,
  languages: LANGUAGES_LIST,
  categories: CATEGORIES_LIST,
  currencies: CURRENCIES_LIST,
  reasons: REASONS_LIST,
  blockReasons: BLOCK_REASONS_LIST
};

const constantsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default constantsReducer;
