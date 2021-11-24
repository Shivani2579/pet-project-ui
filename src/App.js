import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddEditCandidate from "pages/candidate/addEditCandidate";
import ListCandidates from "pages/candidate/listCandidates";
import MainLayout from "layout/main";
import { getPageData } from "api/commonApis";
import { PagedataContext, LoaderContext } from "contexts";

const App = () => {
  const [pageData, setPagedata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPageData().then((res) => {
      setPagedata(res.data);
    });
  }, []);

  return (
    <Router>
      <PagedataContext.Provider value={pageData}>
        <LoaderContext.Provider value={{ loading, setLoading }}>
          <MainLayout>
            <Switch>
              <Route exact path="/">
                <ListCandidates />
              </Route>
              <Route path={["/newcandidate/:action", "/candidate/:id"]}>
                <AddEditCandidate />
              </Route>
            </Switch>
          </MainLayout>
        </LoaderContext.Provider>
      </PagedataContext.Provider>
    </Router>
  );
};

export default App;
