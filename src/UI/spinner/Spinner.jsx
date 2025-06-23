 import { BiLoaderAlt } from 'react-icons/bi';

const Spinner = () => {
    return (
        <BiLoaderAlt
            data-testid="spinner-mini"
            className="text-blue-500 text-3xl animate-spin"
        />
    );
};

export default Spinner;
