import ManageSector from '../containers/App/Admin/manageSector/ManageSector';
import ManageSectorForm from '../containers/App/Admin/manageSector/ManageSectorForm';
import UpdateSector from '../containers/App/Admin/manageSector/UpdateSector';
import ManageBond from '../containers/App/Admin/manageBond/ManageBond';
import UpdateBond from '../containers/App/Admin/manageBond/UpdateBond';
import ManageBondForm from '../containers/App/Admin/manageBond/ManageBondForm';
import ChangePassword from '../containers/App/Pages/userAuth/ChangePassword';
import Profile from '../containers/App/Admin/profilePage/Profile';
import Dashboard from '../containers/App/Admin/Dashboard';
import ManageTraderBroker from '../containers/App/Admin/manageTraderBroker/ManageTraderBroker';

let routes = [
    {
        path: 'dashboard',
        component: Dashboard,
        exact: true
    },
    {
        path: 'manageSector',
        component: ManageSector,
        exact: true
    },
    {
        path: 'sectorform',
        component: ManageSectorForm,
        exact: true
    },
    {
        path: 'updatesector',
        component: UpdateSector,
        exact: true
    },
    {
        path: 'manageBond',
        component: ManageBond,
        exact: true
    },
    {
        path: 'updatebond',
        component: UpdateBond,
        exact: true
    },
    {
        path: 'bondform',
        component: ManageBondForm,
        exact: true
    },
    {
        path: 'manageUser',
        component: ManageTraderBroker,
        exact: true
    },
    {
        path: 'change-password/:id',
        component: ChangePassword,
        exact: true
    },
    {
        path: 'profile/:id',
        component: Profile,
        exact: true
    },

]

export default routes