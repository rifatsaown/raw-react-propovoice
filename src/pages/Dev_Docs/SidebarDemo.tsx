import { SidebarControls } from '../../components/SidebarControls/SidebarControls';

// Demo page showing how to use SidebarControls with Redux
export default function SidebarDemo() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sidebar Controls Demo</h1>
      <p className="mb-4 text-gray-600">
        This page demonstrates how to control the sidebar from any component
        using Redux. The sidebar state is now globally managed and accessible
        from anywhere in the app.
      </p>

      <div className="mb-6">
        <SidebarControls />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">How it works:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Redux store manages global sidebar state</li>
          <li>
            Any component can access state with{' '}
            <code className="bg-gray-200 px-1 rounded">useAppSelector</code>
          </li>
          <li>
            Any component can dispatch actions with{' '}
            <code className="bg-gray-200 px-1 rounded">useAppDispatch</code>
          </li>
          <li>
            State changes are automatically reflected across all components
          </li>
        </ol>
      </div>

      <div className="mt-6 bg-green-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold mb-2">Available Actions:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <code className="bg-gray-200 px-1 rounded">toggleOpen()</code> -
            Toggle sidebar open/closed
          </li>
          <li>
            <code className="bg-gray-200 px-1 rounded">toggleCollapse()</code> -
            Toggle sidebar collapsed/expanded
          </li>
          <li>
            <code className="bg-gray-200 px-1 rounded">setOpen(boolean)</code> -
            Set sidebar open state
          </li>
          <li>
            <code className="bg-gray-200 px-1 rounded">
              setCollapsed(boolean)
            </code>{' '}
            - Set sidebar collapsed state
          </li>
        </ul>
      </div>
    </div>
  );
}
