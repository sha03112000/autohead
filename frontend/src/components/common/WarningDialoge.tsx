import { Modal } from "../Modal";

interface WarningProps {
    message: string;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean
}

const WarningDialoge = (props: WarningProps) => {
    return (

        <Modal isOpen={props.isOpen} onClose={props.onCancel} title="Delete">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Warning</h2>
            </div>
            <p className="text-gray-700">{props.message}</p>
            <div className="flex justify-end mt-4">
                <button className="mr-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300" onClick={props.onCancel}>Cancel</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={props.onConfirm} disabled={props.isLoading}>
                    {props.isLoading ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </Modal >

    );
};

export default WarningDialoge;
