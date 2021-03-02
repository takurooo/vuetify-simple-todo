import { format } from 'date-fns';

export default {
  filters: {
    toDsplayableDate(value) {
      if (value) {
        return format(new Date(value), 'yyyy/MM/dd E');
      }
      return '';
    },
  },
};
