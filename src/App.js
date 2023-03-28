import logo from './logo.svg';
import './App.css';
import { graphql } from "@octokit/graphql";
import {useEffect} from 'react';

const repo = async () => {
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  const {repository, viewer} = await graphql (
    `
    {
      repository(owner: "codestates-seb", name: "agora-states-fe") {
        issues(first:1) {
          edges {
            node {
              title
            }
          }
        },
        pullRequests(first:1) {
          edges {
            node {
              title
            }
          }
        }
      },
      viewer {
        login
      }
    }
  `,
  {
    headers: {
      authorization: `token ${GITHUB_TOKEN}`,
    },
  }
);

return {repository, viewer};
}


function App() {
  useEffect(() => {
    repo()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
