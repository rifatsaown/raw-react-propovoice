import myTask from "./assets/myTask.svg";
import inbox from "./assets/inbox.svg";
import analytics from "./assets/analytics.svg";
import salesPipeline from "./assets/salesPipeline.svg";
import proposal from "./assets/proposal.svg";
import agreement from "./assets/agreement.svg";
import servicePackages from "./assets/servicePackages.svg";
import invoices from "./assets/invoices.svg";
import orders from "./assets/orders.svg";
import dataflow from "./assets/dataflow.svg";
import folderPlus from "./assets/folderPlus.svg";
import folderShield from "./assets/folderShield.svg";
import userClient from "./assets/userClient.svg";
import briefcase from "./assets/briefcase-business.svg";
import whatsapp from "./assets/whatsapp.svg";
import createIconComponent from "./CreateIconComponent";

// Create icon components using the factory function
export const MyTaskIcon = createIconComponent(myTask, "My Task");
export const InboxIcon = createIconComponent(inbox, "Inbox");
export const AnalyticsIcon = createIconComponent(analytics, "Analytics");
export const SalesPipelineIcon = createIconComponent(salesPipeline, "Sales Pipeline");
export const ProposalIcon = createIconComponent(proposal, "Proposal");
export const AgreementIcon = createIconComponent(agreement, "Agreement");
export const ServicePackagesIcon = createIconComponent(servicePackages, "Service Packages");
export const InvoicesIcon = createIconComponent(invoices, "Invoices");
export const OrdersIcon = createIconComponent(orders, "Orders");
export const DataflowIcon = createIconComponent(dataflow, "Dataflow");
export const FolderPlusIcon = createIconComponent(folderPlus, "Folder Plus");
export const FolderShieldIcon = createIconComponent(folderShield, "Folder Shield");
export const UserClientIcon = createIconComponent(userClient, "User Client");
export const BriefcaseIcon = createIconComponent(briefcase, "Briefcase");
export const WhatsappIcon = createIconComponent(whatsapp, "Whatsapp");

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
};

export default Icons;