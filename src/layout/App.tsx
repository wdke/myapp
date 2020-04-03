import React from 'react';
import { connect } from 'dva';
import Main from '../components/layout/Main';

export default function App(props: { children: any; }) {
  return (
    <Main>
      {props.children}
    </Main>
  );
}

