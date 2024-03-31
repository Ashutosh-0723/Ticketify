/*export type TaskStagesSelectQueryVariables = Types.Exact<{
    filter: Types.TaskStageFilter;
    sorting?: Types.InputMaybe<Array<Types.TaskStageSort> | Types.TaskStageSort>;
    paging: Types.OffsetPaging;
  }>;
  
  export type TaskStagesSelectQuery = {
    taskStages: { nodes: Array<Pick<Types.TaskStage, "id" | "title">> };
  };*/

  
  import { useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import gql from "graphql-tag";

import { TaskStagesSelectQuery } from "@/graphql/types";

const TASK_STAGES_SELECT_QUERY = gql`
    query TaskStagesSelect(
        $filter: TaskStageFilter!
        $sorting: [TaskStageSort!]
        $paging: OffsetPaging!
    ) {
        taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                id
                title
            }
        }
    }
`;

export const useTaskStagesSelect = () => {
  return useSelect<GetFieldsFromList<TaskStagesSelectQuery>>({
    resource: "taskStages",
    meta: { gqlQuery: TASK_STAGES_SELECT_QUERY },
  });
};
