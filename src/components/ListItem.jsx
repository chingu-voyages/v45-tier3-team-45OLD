import { Fragment, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { deleteCommentById, updateCommentById } from '../service/comment';

function ListItem({ comment }) {
	const [openDelete, setOpenDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [editContent, setEditContent] = useState(comment.content);

	const cancelButtonRef = useRef(null);

	const currentUser = useSelector((state) => state.user.value);
	const navigate = useNavigate();

	const handleOnDelete = async () => {
		try {
			await deleteCommentById(comment.id);
			navigate(0);
		} catch (error) {
			console.error(error);
		}
	};

	const handleOpenEdit = () => {
		setOpenEdit(true);
		setEditContent(comment.content); // Reset the edit content to the original review content
	};

	const handleOnUpdate = async (e) => {
		e.preventDefault();
		// Initialize request body
		try {
			await updateCommentById(comment.id, editContent);
			navigate(0);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setOpenEdit(false);
		}
	};

	return (
		<div>
			<Transition.Root show={openEdit} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					initialFocus={cancelButtonRef}
					onClose={setOpenEdit}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
									<div>
										<div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-600 rounded-full">
											<PencilSquareIcon
												className="w-6 h-6 text-white"
												aria-hidden="true"
											/>
										</div>
										<div className="mt-3 text-center sm:mt-5">
											<Dialog.Title
												as="h3"
												className="text-base font-semibold leading-6 text-gray-900"
											>
												edit recipe
											</Dialog.Title>
											<div className="mt-2">
												<textarea
													name="message"
													id="message"
													rows={5}
													className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													value={editContent}
													onChange={(e) => setEditContent(e.target.value)}
												/>
											</div>
										</div>
									</div>
									<div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
										<button
											type="button"
											className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
											onClick={handleOnUpdate}
										>
											save
										</button>
										<button
											type="button"
											className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
											onClick={() => setOpenEdit(false)}
											ref={cancelButtonRef}
										>
											cancel
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<Transition.Root show={openDelete} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					initialFocus={cancelButtonRef}
					onClose={setOpenDelete}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
									<div className="sm:flex sm:items-start">
										<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
											<ExclamationTriangleIcon
												className="w-6 h-6 text-red-600"
												aria-hidden="true"
											/>
										</div>
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<Dialog.Title
												as="h3"
												className="text-base font-semibold leading-6 text-gray-900"
											>
												delete review
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500">
													delete your review permanently?
												</p>
											</div>
										</div>
									</div>
									<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
										<button
											type="button"
											className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
											onClick={handleOnDelete}
										>
											delete
										</button>
										<button
											type="button"
											className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
											onClick={() => setOpenDelete(false)}
											ref={cancelButtonRef}
										>
											cancel
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<div className="flex space-x-4 text-sm text-gray-500">
				<div className="flex-none py-10">
					<Link to={`/dashboard/user-profile/${comment.email}`}>
						<img
							src={comment.picture}
							alt="user profile"
							className="object-cover w-10 h-10 rounded-full bg-gray-50"
						/>
					</Link>
				</div>
				<div className="flex-1 py-10 border-t border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-medium text-gray-900">{comment.username}</h3>
							<p>{format(new Date(comment.createdAt), 'MMMM d, yyyy')}</p>
						</div>
						{currentUser && currentUser.id === comment.userId && (
							<div className="flex items-center">
								<button
									className="mr-2 inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									onClick={handleOpenEdit}
								>
									<PencilSquareIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
									edit
								</button>
								<button
									className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									onClick={() => setOpenDelete(true)}
								>
									<TrashIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
									delete
								</button>
							</div>
						)}
					</div>
					<div className="mt-4 prose-sm prose text-gray-500 max-w-none">
						{comment.content}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListItem;
