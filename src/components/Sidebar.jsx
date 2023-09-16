import { Link } from 'react-router-dom';
import { logoUrl } from '../constants/index';

export function Sidebar({ navigation, currentTab, setCurrentTab }) {
	return (
		<div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
			<div className="flex items-center h-16 shrink-0">
				<Link to="/">
					<img className="w-auto h-16" src={logoUrl} alt="logo" />
				</Link>
			</div>
			<nav className="flex flex-col flex-1">
				<ul className="flex flex-col flex-1 gap-y-7">
					<li>
						<ul className="-mx-2 space-y-1">
							{navigation.map((item) => (
								<li key={item.name} onClick={() => setCurrentTab(item.name)}>
									<Link
										to={item.href}
										className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold font-secondary ${
											currentTab === item.current
												? 'bg-gray-50 text-indigo-600'
												: 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
										}`}
									>
										<item.icon
											className={`h-6 w-6 shrink-0 ${
												item.current
													? 'text-indigo-600'
													: 'text-gray-400 group-hover:text-indigo-600'
											}`}
											aria-hidden="true"
										/>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	);
}
