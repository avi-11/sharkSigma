import { useDispatch } from "react-redux";

import NavbarStyles from "./Navbar.module.css";
import NavbarLink from "./NavbarLink";

// Importing Assets
import backtestStrategyIcon from "./assets/backtestStrategy.svg";
import marketOverviewIcon from "../../assets/Images/marketOverviewIcon.svg";
import lensIcon from "../../assets/Images/lensIcon.svg";
import basket from "../../assets/Images/basket.png";
import { changeCountry } from "./service/navbarSlice";

const Navbar = ({ sidebarOpen }) => {
  const dispatch = useDispatch();

  var cookiePresent = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );
  const userRole = cookiePresent.user_role;

  return (
    <div className={NavbarStyles.sidebar}>
      {sidebarOpen ? (
        <>
          <div>
            <p className={NavbarStyles.sidebar__header}>RESEARCH</p>
            <ul className={NavbarStyles.sidebar__linkContainer}>
              <NavbarLink
                icon={marketOverviewIcon}
                userRole={userRole}
                to="/marketOverview"
                toName="Market Overview"
              />

              <NavbarLink
                icon={basket}
                userRole={userRole}
                to="/baskets"
                toName="Baskets"
              />

              <NavbarLink
                icon={backtestStrategyIcon}
                userRole={userRole}
                to="/admin/accountManagement"
                toName="Account Management"
              />

              <NavbarLink
                icon={lensIcon}
                userRole={userRole}
                to="/lens"
                toName="Lens"
              />
            </ul>
          </div>

          <div className={NavbarStyles.sidebar__metaContainer}>
            <div>
              <p className={NavbarStyles.sidebar__header}>MARKETS</p>
              <ul className={NavbarStyles.sidebar__linkContainer}>
                <NavbarLink
                  icon=""
                  userRole={userRole}
                  to=""
                  toName="US"
                  onClick={() =>
                    dispatch(
                      changeCountry({
                        country: "US",
                      })
                    )
                  }
                />
                <NavbarLink
                  icon=""
                  userRole={userRole}
                  to=""
                  toName="India"
                  onClick={() =>
                    dispatch(
                      changeCountry({
                        country: "India",
                      })
                    )
                  }
                />
                <NavbarLink
                  icon=""
                  userRole={userRole}
                  to=""
                  toName="Crypto"
                  onClick={() =>
                    dispatch(
                      changeCountry({
                        country: "Crypto",
                      })
                    )
                  }
                />
              </ul>
            </div>

            <div>
              <p className={NavbarStyles.sidebar__header}>SETTINGS</p>
              <ul className={NavbarStyles.sidebar__linkContainer}>
                <NavbarLink
                  icon=""
                  userRole={userRole}
                  to="/brokerage"
                  toName="Brokerage Apps"
                />
                <NavbarLink
                  icon=""
                  userRole={userRole}
                  to=""
                  toName="Account Info"
                />
                <NavbarLink
                  icon=""
                  userRole={userRole}
                  to=""
                  toName="Statements"
                />
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <ul className={NavbarStyles.sidebarClosed__linkContainer}>
            <NavbarLink
              icon={marketOverviewIcon}
              userRole={userRole}
              to="/marketOverview"
              label="Market Overview"
            />

            <NavbarLink
              icon={basket}
              userRole={userRole}
              to="/baskets"
              label="Baskets"
            />

            <NavbarLink
              icon={backtestStrategyIcon}
              userRole={userRole}
              to="/admin/accountManagement"
              label="Account Management"
            />
            <NavbarLink
              icon={lensIcon}
              userRole={userRole}
              to="/lens"
              label="Lens"
            />
          </ul>
        </>
      )}
    </div>
  );
};

export default Navbar;
