import Card from './Card';

function List({ posts }) {
	return (
		<div className="bg-white">
			<div className="max-w-2xl px-4 py-5 mx-auto sm:px-6 sm:py-5 lg:px-0">
				{posts.length === 0 ? (
					<p className="text-center text-gray-600 font-primary">
						No posts available.
					</p>
				) : (
					<ul role="list">
						{posts.map((post) => (
							<li key={post.id}>
								<Card post={post} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default List;
