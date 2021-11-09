import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddEditCandidate from "./components/candidate/addEditCandidate";
import ListCandidates from "./components/candidate/listCandidates";
import Layout from "./components/layout/layout";
import { getPageData } from "./api/commonApis";
import { PagedataContext } from "./contexts/pagedataContext";

const App = () => {
  const [pagedata, setPagedata] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getPageData().then((res) => {
      setPagedata(res.data);
    });
  };

  return (
    <Router>
      <PagedataContext.Provider value={pagedata}>
        <Layout>
          <Switch>
            <Route exact path="/">
              <ListCandidates />
            </Route>
            <Route path={["/newcandidate/:action", "/candidate/:action/:id"]}>
              <AddEditCandidate />
            </Route>
          </Switch>
        </Layout>
      </PagedataContext.Provider>
    </Router>
  );
};

export default App;
