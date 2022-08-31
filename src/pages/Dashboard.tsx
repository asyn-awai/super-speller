import React from "react";
import SideNav from "../components/Dashboard/SideNav";
import Layout from "../components/Layout";

const Dashboard: React.FC = (): JSX.Element => {
	//todo add option for no signin btn
	return (
		<Layout navbarProps={[{ name: "Home", url: "/" }]} noNav>
			<div className="fixed hidden transition-all duration-300 w-28 group hover:md:w-48 md:block">
				<SideNav />
			</div>
			<div className="h-screen ml-2 md:ml-36">
                <br/>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Vitae doloremque, distinctio vel assumenda architecto fuga?
					In illum magnam debitis autem impedit voluptate corporis,
					earum fugit velit, quasi vero asperiores quibusdam. Lorem
					ipsum dolor sit amet, consectetur adipisicing elit.
					Assumenda ipsa qui libero quasi reprehenderit ullam earum
					corrupti esse nemo beatae? Eligendi ad odio sit nobis vitae
					animi illo provident est.
				</p>
			</div>
		</Layout>
	);
};

export default Dashboard;
