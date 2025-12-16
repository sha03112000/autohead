

interface IsErrorDisplayProps {
    type: string
}


const IsErrorDisplay = (props: IsErrorDisplayProps) => {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <p className="text-red-500">Error fetching {props.type}</p>
        </div>
    )
}

export default IsErrorDisplay