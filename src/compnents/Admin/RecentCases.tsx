// components/admin/RecentCases.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';


// Mock data - replace with API data
const mockCases: Case[] = [
  {
    id: '1',
    title: 'Smith vs. Johnson Corporation',
    client: 'Robert Smith',
    status: 'open',
    type: 'Corporate Litigation',
    assignedTo: 'Sarah Johnson',
    openedDate: '2023-10-15',
    lastUpdated: '2023-10-28',
  },
  {
    id: '2',
    title: 'Estate of Williams',
    client: 'Mary Williams',
    status: 'pending',
    type: 'Estate Planning',
    assignedTo: 'Michael Chen',
    openedDate: '2023-10-18',
    lastUpdated: '2023-10-27',
  },
  {
    id: '3',
    title: 'Davis Divorce Proceedings',
    client: 'Jennifer Davis',
    status: 'open',
    type: 'Family Law',
    assignedTo: 'Emily Rodriguez',
    openedDate: '2023-10-20',
    lastUpdated: '2023-10-26',
  },
  {
    id: '4',
    title: 'State vs. Anderson',
    client: 'James Anderson',
    status: 'closed',
    type: 'Criminal Defense',
    assignedTo: 'David Wilson',
    openedDate: '2023-09-05',
    lastUpdated: '2023-10-25',
  },
  {
    id: '5',
    title: 'Thompson Patent Dispute',
    client: 'Thompson Technologies',
    status: 'open',
    type: 'Intellectual Property',
    assignedTo: 'Lisa Zhang',
    openedDate: '2023-10-22',
    lastUpdated: '2023-10-24',
  },
];

const statusColors = {
  open: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-gray-100 text-gray-800',
};

const caseTypes = ['All', 'Corporate Litigation', 'Estate Planning', 'Family Law', 'Criminal Defense', 'Intellectual Property'];
const statusFilters = ['All', 'open', 'pending', 'closed'];

export default function RecentCases() {
  const [filteredType, setFilteredType] = useState('All');
  const [filteredStatus, setFilteredStatus] = useState('All');

  const filteredCases = mockCases.filter(caseItem => {
    const typeMatch = filteredType === 'All' || caseItem.type === filteredType;
    const statusMatch = filteredStatus === 'All' || caseItem.status === filteredStatus;
    return typeMatch && statusMatch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Cases</h2>
        <Link 
          href="/admin/cases"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View all
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div>
          <label htmlFor="type-filter" className="sr-only">Filter by type</label>
          <select
            id="type-filter"
            className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={filteredType}
            onChange={(e) => setFilteredType(e.target.value)}
          >
            {caseTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select
            id="status-filter"
            className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
          >
            {statusFilters.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cases List */}
      <div className="overflow-hidden">
        {filteredCases.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredCases.map((caseItem) => (
              <li key={caseItem.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        <Link href={`/admin/cases/${caseItem.id}`}>
                          {caseItem.title}
                        </Link>
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[caseItem.status]}`}>
                          {caseItem.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="truncate">{caseItem.client}</span>
                      <span className="mx-1">•</span>
                      <span>{caseItem.type}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>Assigned to {caseItem.assignedTo}</span>
                      <span className="mx-1">•</span>
                      <span>Opened {formatDate(caseItem.openedDate)}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No cases found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex">
        <Link
          href="/admin/cases/new"
          className="flex-1 text-center bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 py-2 px-4 rounded-md text-sm font-medium"
        >
          + New Case
        </Link>
      </div>
    </div>
  );
}