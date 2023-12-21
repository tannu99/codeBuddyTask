import * as React from 'react';
export const NavigationRef = React.createRef();

export function navigate(name, params) {
  if (NavigationRef.current) {
    NavigationRef.current.navigate(name, params);
  }
}

export function goBack() {
  if (NavigationRef.current) {
    NavigationRef.current.goBack();
  }
}
