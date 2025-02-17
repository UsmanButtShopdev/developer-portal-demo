import { useEffect, useState } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react' // https://github.com/scalar/scalar/blob/main/documentation/configuration.md
import { GoogleLogin } from '@react-oauth/google';
import { Breadcrumb, Layout, Menu, theme, Segmented } from 'antd';
import documentations from "./sample-docs";
import '@scalar/api-reference-react/style.css' //https://github.com/scalar/scalar/blob/main/documentation/themes.md
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
    localStorage.setItem("isDark", "false");
  }, [])
  const [ selectedSegment, setSelectedSegment ] = useState('HP with Auth');
  const [scalarTheme, setScalarTheme ] = useState('kepler');
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
        padding: "0 32px",
      }}>
        <div className='api-segment'>
          <span>API Version: </span>
        <Segmented
        defaultValue={selectedSegment}
        style={{ margin: "12px 0" }}
        onChange={(value) => setSelectedSegment(value)}
        options={['HP with Auth', 'HP large API']}
      />
       {/* <Segmented
        defaultValue={scalarTheme}
        style={{ margin: "12px 0" }}
        onChange={(value) => setScalarTheme(value)}
        options={['alternate', 'default', 'moon', 'purple', 'solarized',
'bluePlanet', 'saturn', 'kepler', 'mars', 'deepSpace', 'none']}
      /> */}
        </div>
        <ApiReferenceReact
          configuration={{
            spec: documentations[selectedSegment],
            withDefaultFonts: 'false',
            theme: scalarTheme,
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
