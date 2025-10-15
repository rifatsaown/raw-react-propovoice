import agreement from './assets/agreement.svg';
import analytics from './assets/analytics.svg';
import briefcase from './assets/briefcase-business.svg';
import dataflow from './assets/dataflow.svg';
import folderPlus from './assets/folderPlus.svg';
import folderShield from './assets/folderShield.svg';
import inbox from './assets/inbox.svg';
import invoices from './assets/invoices.svg';
import myTask from './assets/myTask.svg';
import orders from './assets/orders.svg';
import proposal from './assets/proposal.svg';
import salesPipeline from './assets/salesPipeline.svg';
import servicePackages from './assets/servicePackages.svg';
import userClient from './assets/userClient.svg';
import whatsapp from './assets/whatsapp.svg';
import textFile from './assets/textFile.svg';
import highFlag from './assets/highFlag.svg';
import lowFlag from './assets/lowFlag.svg';
// import mediumFlag from './assets/mediumFlag.svg';
import CreateIconComponent from './CreateIconComponent';

// Create icon components using the factory function
export const MyTaskIcon = CreateIconComponent(myTask, 'My Task');
export const InboxIcon = CreateIconComponent(inbox, 'Inbox');
export const AnalyticsIcon = CreateIconComponent(analytics, 'Analytics');
export const SalesPipelineIcon = CreateIconComponent(
  salesPipeline,
  'Sales Pipeline'
);
export const ProposalIcon = CreateIconComponent(proposal, 'Proposal');
export const AgreementIcon = CreateIconComponent(agreement, 'Agreement');
export const ServicePackagesIcon = CreateIconComponent(
  servicePackages,
  'Service Packages'
);
export const InvoicesIcon = CreateIconComponent(invoices, 'Invoices');
export const OrdersIcon = CreateIconComponent(orders, 'Orders');
export const DataflowIcon = CreateIconComponent(dataflow, 'Dataflow');
export const FolderPlusIcon = CreateIconComponent(folderPlus, 'Folder Plus');
export const FolderShieldIcon = CreateIconComponent(
  folderShield,
  'Folder Shield'
);
export const UserClientIcon = CreateIconComponent(userClient, 'User Client');
export const BriefcaseIcon = CreateIconComponent(briefcase, 'Briefcase');
export const WhatsappIcon = CreateIconComponent(whatsapp, 'Whatsapp');
export const TextFileIcon = CreateIconComponent(textFile, 'Text File');
export const HighFlagIcon = CreateIconComponent(highFlag, 'High Flag');
export const LowFlagIcon = CreateIconComponent(lowFlag, 'Low Flag');
// export const MediumFlagIcon = CreateIconComponent(mediumFlag, 'Medium Flag');

// Export all icons as a collection
const Icons = {
  MyTaskIcon,
  InboxIcon,
  AnalyticsIcon,
  SalesPipelineIcon,
  ProposalIcon,
  AgreementIcon,
  ServicePackagesIcon,
  InvoicesIcon,
  OrdersIcon,
  DataflowIcon,
  FolderPlusIcon,
  FolderShieldIcon,
  UserClientIcon,
  BriefcaseIcon,
  WhatsappIcon,
  TextFileIcon,
  HighFlagIcon,
  LowFlagIcon,
  // MediumFlagIcon,
};

export default Icons;
