import React from 'react';

export default function Validation({ condition, text }) {
	return (
		<>{condition ? <span className='text-danger fs-6'>{text}</span> : ''}</>
	);
}
