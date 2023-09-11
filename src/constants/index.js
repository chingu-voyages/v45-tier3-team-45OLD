import {
	HomeIcon,
	PlusCircleIcon,
	FolderIcon,
	UserGroupIcon,
	ChatBubbleLeftIcon,
	HeartIcon,
} from '@heroicons/react/24/outline';

export const name = 'facebook clone';
export const slogan =
	'Connect with friends and the world around you on Facebook.';
export const logoUrl =
	'https://res.cloudinary.com/yilin1234/image/upload/v1692498189/f__2_-removebg-preview_xxhyv5.png';

export const navigation = [
	{
		name: 'all posts',
		href: 'all-posts',
		icon: HomeIcon,
		current: 'all posts',
	},
	{
		name: 'my posts',
		href: 'my-posts',
		icon: FolderIcon,
		current: 'my posts',
	},
	{
		name: 'new post',
		href: 'create',
		icon: PlusCircleIcon,
		current: 'new post',
	},
	{
		name: 'users',
		href: 'users',
		icon: UserGroupIcon,
		current: 'users',
	},
	{
		name: 'messages',
		href: 'message-panel',
		icon: ChatBubbleLeftIcon,
		current: 'messages',
	},
	{
		name: 'liked posts',
		href: 'liked-posts',
		icon: HeartIcon,
		current: 'liked posts',
	},
];
