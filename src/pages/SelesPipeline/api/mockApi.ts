import sampleData from '../data/sampleData.json';
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
const transformData = (data: typeof sampleData) => {
  const transformedColumns: Columns = {};

  Object.entries(data.columns).forEach(([columnName, tasks]) => {
    transformedColumns[columnName] = tasks.map((task) => ({
      ...task,
      status: task.status as TaskStatus,
      team: transformTeamIds(task.team as number[], data.team),
    })) as Task[];
  });

  return {
    columns: transformedColumns,
    team: data.team,
  };
};

// Mock API function to load initial data
export const loadSalesPipelineData = (): Promise<{
  columns: Columns;
  team: TeamMember[];
}> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const transformedData = transformData(sampleData);
      resolve(transformedData);
    }, 500);
  });
};

// Mock API function to save data
export const saveSalesPipelineData = (
  columns: Columns
): Promise<DatabaseUpdateResponse> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log('API Call: Database updated with new state', columns);
      console.log('Database updated successfully');
      resolve({ success: true });
    }, 500);
  });
};
