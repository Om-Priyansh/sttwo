import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronUp, ChevronDown, Home, DollarSign, PencilRuler, ScrollText, Megaphone, UserRoundPen, Settings } from 'lucide-react';

// import "./Sidebar.css";

const NavItem = ({ icon: Icon, label, to, children, isActive, activeChild, parentKey, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  return (
    <div className="my-1">
      <div 
        className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 relative
          ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
        onClick={() => {
          onClick(); // This will handle navigation
          if (hasChildren) setIsOpen(!isOpen); // Toggle open state for child items
        }}
      >
        {isActive && (
          <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-e-full" />
        )}
        <Icon className="w-5 h-5 mr-3" />
        <span className="flex-grow">{label}</span>
        {hasChildren && (
          isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        )}
      </div>
      {isOpen && children && (
        <div className="relative ml-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-200">
          {children.map((child, index) => (
            <div
              key={index}
              className={`py-3 px-4 cursor-pointer hover:bg-gray-100 relative
                ${activeChild === child && parentKey === label ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              onClick={(e) => {
                e.stopPropagation();
                onClick(child); // Navigate on child click
              }}
            >
              {activeChild === child && parentKey === label && (
                <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 rounded-e-full" />
              )}
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const history = useHistory(); // Hook for navigation

  const [activeItem, setActiveItem] = useState('Help-desk');
  const [activeChild, setActiveChild] = useState('Help-desk');
  const [activeParent, setActiveParent] = useState('Community Communications');

  const handleClick = (item, child = null, route = '/') => {
    if (child) {
      setActiveItem(item);
      setActiveChild(child);
      setActiveParent(item);
      // Ensure child is defined before transforming it for the URL
      const childRoute = child ? child.toLowerCase().replace(/\s+/g, '-') : '';
      console.log(`${route}/${childRoute}`);
      history.push(`${route}/${childRoute}`);
    } else {
      setActiveItem(item);
      setActiveChild(null);
      setActiveParent(null);
      history.push(route);
    }
  };

  return (
    <div className="w-64 h-screen  overflow-y-auto bg-white border-r select-none scrollbar mb-10"
    style={{
      scrollbarWidth:"none",
    }}
    
    >
      <NavItem
        icon={Home}
        label="Dashboard"
        children={['Maintenance Overview', 'Helpdesk Overview', 'Fund Positions', 'Occupancy Overview']}
        isActive={activeItem === 'Dashboard'}
        activeChild={activeChild}
        parentKey="Dashboard"
        
        onClick={(child) => handleClick('Dashboard', child, '/dashboard')}
      />
      
      <NavItem
        icon={DollarSign}
        label="Finance Management"
        children={['Bank amount/assets/funds held', 'Income and Expense Management', 'General Ledger', 'Assets and Inventory']}
        isActive={activeItem === 'Finance Management'}
        activeChild={activeChild}
        parentKey="Finance Management"
        onClick={(child) => handleClick('Finance Management', child, '/finance-management')} // Dynamic child route
      />
      <NavItem
        icon={PencilRuler}
        label="Facility Management"
        children={['Renting', 'Scheduling Facility Usage']}
        isActive={activeItem === 'Facility Management'}
        activeChild={activeChild}
        parentKey="Facility Management"
        
        onClick={(child) => handleClick('Facility Management', child, '/facility-management')} // Route for Facility Management
      />
      <NavItem
        icon={ScrollText}
        label="Admin Reports"
        children={['Income/Expense Overview', 'Maintenance Overview', 'Helpdesk Overview', 'Fund Positions', 'Occupancy Overview']}
        isActive={activeItem === 'Admin Reports'}
        activeChild={activeChild}
        parentKey="Admin Reports"
        
        onClick={(child) => handleClick('Admin Reports', child, '/admin-reports')} // Route for Admin Reports
      />
      <NavItem
        icon={Megaphone}
        label="Community Communications"
        children={['Notices','Helpdesk', 'Complaint Mangement', 'Voting For Meetings', 'On-line AGM']}
        isActive={activeItem === 'Community Communications'}
        activeChild={activeChild}
        parentKey="Community Communications"
        onClick={(child) => handleClick('Community Communications', child, '/community-communications')} // Dynamic child route
      />
      <NavItem
        icon={UserRoundPen}
        label="Account Edit"
        isActive={activeItem === 'Account Edit'}
        onClick={() => handleClick('Account Edit', null, '/account-edit')} // Route for Account Edit
      />
      <NavItem
        icon={Settings}
        label="Settings"
        isActive={activeItem === 'Settings'}
        onClick={() => handleClick('Settings', null, '/settings')} // Route for Settings
      />
    </div>
  );
};

export default Sidebar;
