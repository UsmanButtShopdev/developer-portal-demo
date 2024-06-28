import { useEffect, useState } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react'
import { GoogleLogin } from '@react-oauth/google';
import { Breadcrumb, Layout, Menu, theme, Segmented } from 'antd';
import documentations from "./sample-docs";
import '@scalar/api-reference-react/style.css'
import './App.css';

const { Header, Content, Footer } = Layout;
const items = [{
  key: 1,
  label:'API Documentation'
}, {
  key: 2,
  label:'Apps'
}, {
  key: 3,
  label:'ISV'
}, {
  key: 4,
  label:'Integrations'
}];

function App() {
  useEffect(() => {
    console.log(documentations);
  }, [])
  const [ selectedSegment, setSelectedSegment ] = useState('Preview');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // LINK TO PROPS DOC: https://github.com/scalar/scalar/blob/main/documentation/configuration.md
  return (
    <Layout>
      <Header className="header">
        <div className="demo-logo">
          <img src="https://www.hpwex.com/wex_ui/images/LandingPageImages/Logo-wrap.svg" alt="logo" />
          {/* HP WEX - Developer Portal */}
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          // style={{ flex: 1, minWidth: 0 }}
        />
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
      </Header>
      <Content style={{
        padding: "0 64px",
      }}>
        <div className='api-segment'>
          <span>API Version: </span>
        <Segmented
        defaultValue={selectedSegment}
        style={{ margin: "12px 0" }}
        onChange={(value) => setSelectedSegment(value)}
        options={['JSON', 'Preview', 'V1', 'withAuth', 'HP Long API']}
      />
        </div>
        <ApiReferenceReact
          configuration={{
            spec: documentations[selectedSegment],
          }}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        HP WEX © HP Development Company {new Date().getFullYear()} 
      </Footer>
    </Layout>
  );
}

export default App;
