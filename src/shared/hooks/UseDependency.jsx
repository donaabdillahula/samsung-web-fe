import React, { useContext } from 'react'
import { DependencyContext } from '../context/DependencyContext';

export const UseDependency = () => {
  return useContext(DependencyContext);
}
