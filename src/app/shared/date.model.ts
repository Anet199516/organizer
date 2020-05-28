import * as moment from "moment";

export interface Week {
  days: Day[];
}

export interface Day {
  value: moment.Moment;
  disabled: boolean;
  active: boolean;
  selected: boolean;
}
