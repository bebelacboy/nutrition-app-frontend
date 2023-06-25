export const Modal = ({message, onConfirm, onCancel}) => {
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="bg-yellow-200 py-4 px-2 shadow-2xl rounded-xl w-2/3 lg:w-1/3 mx-auto mt-72">
              <p className="text-2xl py-4">{message}</p>
              <div className="flex justify-end">
                <button onClick={onCancel} className="mt-2 me-3 text-lg bg-gray-600 text-white px-3 py-1 rounded-lg">Cancel</button>
                <button onClick={onConfirm} className="mt-2 me-3 text-lg bg-blue-900 text-white px-3 py-1 rounded-lg">Confirm</button>
              </div>
            </div>
  </div>
}