export type ResourceState =
  | 'Creating'
  | 'OK'
  | 'Erred'
  | 'Updating'
  | 'Terminating'
  | 'Terminated';

interface ReportSection {
  header: string;
  body: string;
}

export type Report = ReportSection[];
