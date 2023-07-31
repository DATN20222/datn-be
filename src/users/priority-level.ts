import { Threshold } from "src/config/threshold.enum";
import { User } from "./entities/user.entity";

// function getListFirstPriorityPeople(users: User[], timeStamp: Date ){
//   var priorityUsers = [];
//   for (var i = 0; i < users.length; i++){
//     const user = users[i];
//     if (user.updateTime.getTime() > timeStamp.getTime() - Threshold.TIME_LOG_IN_FOR_FIRST_PRIORITY) {
//       if (user.history == null || user.history.length <= 1){
//         priorityUsers.push(user);
//         continue;
//       }
//       const lastHistory = user.history[user.history.length - 1];
//       if (lastHistory.type != null && lastHistory.type != "DOOR") continue;
//       priorityUsers.push(user);
//     }
//   }
//   return priorityUsers;
// }
function isEdgeFramePosition(position: string) {
  const positionVector = this.convertBase64ToVector(position);
  return (
    positionVector[0] < Threshold.POSITION_EDGE ||
    positionVector[1] < Threshold.POSITION_EDGE ||
    positionVector[2] > 1 - Threshold.POSITION_EDGE ||
    positionVector[3] > 1 - Threshold.POSITION_EDGE
  );
}

function isFirstPriorityUser(user: User, timeStamp: Date){
  if (user.updateTime.getTime() > timeStamp.getTime() - Threshold.TIME_LOG_IN_FOR_FIRST_PRIORITY){
    if (user.history == null || user.history.length <= 1) return true;
    return  !((user.history[user.history.length - 1].type == null)||(user.history[user.history.length - 1].type == undefined) || (user.history[user.history.length - 1].type != "DOOR"));
  } 
  return (user.history && user.history.length > 1 && user.history[user.history.length - 1].position &&
    user.history[user.history.length - 1].timeStamp.getTime() > timeStamp.getTime() - Threshold.TIME_OUT_MAX_FOR_FIRST_PRIORITY && user.history[user.history.length - 1].timeStamp.getTime() < timeStamp.getTime() - Threshold.TIME_OUT_FOR_FIRST_PRIORITY && this.isEdgeFramePosition(user.history[user.history.length - 1].position));
}

function isSecondPriorityUser(user: User, timeStamp: Date){
  return (user.history &&
  user.history.length > 0 &&
  user.history[user.history.length - 1].timeStamp.getTime() > timeStamp.getTime() - Threshold.TIME_MAX_FOR_SECOND_PRIORITY && user.history[user.history.length - 1].timeStamp.getTime() < timeStamp.getTime() - Threshold.TIME_MIN_FOR_SECOND_PRIORITY);
}

