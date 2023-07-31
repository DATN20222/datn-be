export enum Threshold {
  TIME_LOG_IN_FOR_FIRST_PRIORITY = 60000, //ms
  // TIME_LOG_IN_HAVE_UPDATE = 2000,
  TIME_OUT_FOR_FIRST_PRIORITY = 4000, //ms
  TIME_OUT_MAX_FOR_FIRST_PRIORITY = 30000, //ms
  TIME_MAX_FOR_SECOND_PRIORITY = 360000, //ms -> 6'
  TIME_MIN_FOR_SECOND_PRIORITY = 4000, //ms
  POSITION_EDGE = 0.1, 
  DIFFERENT_POSITION = 0.01,
  THRESHOLD_MATCH = 0.15,
  MIN_THRESHOLD_SAVE_VECTOR = 0.1,
  MAX_THRESHOLD_SAVE_VECTOR = 0.4,
  TIME_FOR_UPDATE_HISTORY_WHEN_SAME_POS = 10000,//ms
}