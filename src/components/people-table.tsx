'use client';
import { type Person } from '@/lib/columns';
import React from 'react';

export default function PeopleTable({ data }: { data: Person[] }) {
  return <div>{JSON.stringify(data)}</div>;
}
