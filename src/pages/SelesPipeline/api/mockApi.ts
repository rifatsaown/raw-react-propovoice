import columnsJson from '../data/columns.json';
import teamJson from '../data/team.json';
import type {
  Columns,
  DatabaseUpdateResponse,
  Task,
  TaskStatus,
  TeamMember,
} from '../types';

// Transform team IDs to team objects
const transformTeamIds = (
  teamIds: number[],
  teamMembers: TeamMember[]
): TeamMember[] => {
  return teamIds
    .map((id) => teamMembers.find((member) => member.id === id)!)
    .filter(Boolean);
};

// Transform the JSON data to match our TypeScript interfaces
const transformData = (
  columnsData: typeof columnsJson,
  teamData: typeof teamJson
) => {
  const transformedColumns: { open: Columns; closed: Columns } = {
    open: {},
    closed: {},
  };

  // columnsData now has 'open' and 'closed' keys
  Object.entries(columnsData.open).forEach(([columnName, tasks]) => {
    transformedColumns.open[columnName] = tasks.map((task) => ({
      ...task,
      status: task.status as TaskStatus,
      team: transformTeamIds(task.team as number[], teamData),
    })) as Task[];
  });
  Object.entries(columnsData.closed).forEach(([columnName, tasks]) => {
    transformedColumns.closed[columnName] = tasks.map((task) => ({
      ...task,
      status: task.status as TaskStatus,
      team: transformTeamIds(task.team as number[], teamData),
    })) as Task[];
  });

  return {
    columns: transformedColumns,
    team: teamData,
  };
};

// Mock API function to load initial data
export const loadSalesPipelineData = (): Promise<{
  columns: { open: Columns; closed: Columns };
  team: TeamMember[];
}> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const transformedData = transformData(columnsJson, teamJson);
      resolve(transformedData);
    }, 500);
  });
};

// Mock API function to save data
export const saveSalesPipelineData = (columns: {
  open: Columns;
  closed: Columns;
}): Promise<DatabaseUpdateResponse> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log('API Call: Database updated with new state', columns);
      console.log('Database updated successfully');
      resolve({ success: true });
    }, 500);
  });
};
