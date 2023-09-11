import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

function MessagePanel() {
	const currentUser = useSelector((state) => state.user.value);
	const chatboxEl = useRef(null);
	// wait for TalkJS to load
	const [talkLoaded, markTalkLoaded] = useState(false);

	useEffect(() => {
		Talk.ready.then(() => markTalkLoaded(true));

		if (talkLoaded) {
			const me = new Talk.User({
				id: currentUser.id,
				name: currentUser.username,
				email: currentUser.email,
				photoUrl: currentUser.picture,
				welcomeMessage: 'Hello!',
				role: 'default',
			});

			const session = new Talk.Session({
				appId: import.meta.env.VITE_TALKJS_APPID,
				me: me,
			});

			const chatbox = session.createInbox();
			chatbox.mount(chatboxEl.current);
			return () => session.destroy();
		}
	}, [
		currentUser.email,
		currentUser.id,
		currentUser.picture,
		currentUser.username,
		talkLoaded,
	]);

	return (
		<div
			ref={chatboxEl}
			style={{ width: '90%', margin: '30px', height: '500px' }}
		/>
	);
}

export default MessagePanel;
