import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Validation from '../components/Validation';
import { distributionCenter, paymentType, productsList } from '../data';

export default function Index() {
	const [data, setData] = useState([]);
	// form state
	const [name, setName] = useState('');
	const [distCenter, setDistCenter] = useState('');
	const [payment, setPayment] = useState('');
	const [expired, setExpired] = useState('');
	const [notes, setNotes] = useState('');
	const [products, setProducts] = useState({
		product_name: '',
		units: [{ name: '', price: 0, quantity: 0 }],
	});

	useEffect(() => {
		const getData = async () => {
			await axios
				.get('http://dummy.restapiexample.com/api/v1/employees')
				.then((res) => {
					console.log(res.data);
					setData(res.data.data);
				});
		};

		getData();
	}, []);

	return (
		<>
			<div className='container'>
				<h2 className='mt-5'>Create Order</h2>
				<div className='border p-3 mb-5'>
					<div className='d-flex'>
						<p className='w-25'>Detail</p>
						<div className='w-75'>
							{/* name select */}
							<div className='w-50'>
								<p className='m-0'>
									Name
									<Validation condition={name === ''} text='*' />
								</p>
								<Form.Select
									value={name}
									onChange={(e) => setName(e.target.value)}
								>
									<option selected hidden>
										name
									</option>
									{data.map((item) => (
										<option key={item.id} value={item.employee_name}>
											{item.employee_name}
										</option>
									))}
								</Form.Select>
								<Validation condition={name === ''} text='required' />
							</div>

							{/* disttribution select */}
							<div className='mt-4 w-25'>
								<p className='m-0'>
									Distribution center
									<Validation condition={distCenter === ''} text='*' />
								</p>
								<Form.Select
									value={distCenter}
									onChange={(e) => setDistCenter(e.target.value)}
								>
									<option selected hidden>
										Distribution center
									</option>
									{distributionCenter.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</Form.Select>
								<Validation condition={distCenter === ''} text='required' />
							</div>

							{/* appear if name and distcenter has input */}
							{name !== '' && distCenter !== '' && (
								<>
									<div className='mt-4 d-flex gap-3'>
										{/* payment */}
										<div className='w-50'>
											<p className='m-0'>
												Payment type
												<Validation condition={payment === ''} text='*' />
											</p>
											<Form.Select
												value={payment}
												onChange={(e) => setPayment(e.target.value)}
											>
												<option selected hidden>
													Payment type
												</option>
												{paymentType.map((item) => (
													<option key={item} value={item}>
														{item}
													</option>
												))}
											</Form.Select>
											<Validation condition={payment === ''} text='required' />
										</div>

										{/* expired */}
										<div className='w-50'>
											<p className='m-0'>
												Expired date
												<Validation condition={expired === ''} text='*' />
											</p>
											<Form.Control
												type='date'
												placeholder='expired date'
												min={new Date().toISOString().split('T')[0]}
												value={expired}
												onChange={(e) => setExpired(e.target.value)}
											/>
											<Validation condition={expired === ''} text='required' />
										</div>
									</div>

									{/* notes */}
									<div className='w-50'>
										<p className='m-0'>Notes</p>
										<Form.Control
											as='textarea'
											rows={3}
											value={notes}
											onChange={(e) => setNotes(e.target.value)}
										/>
									</div>
								</>
							)}
						</div>
					</div>

					{/* appear if payment and expired has input */}
					{payment !== '' && expired !== '' && (
						<>
							<hr className='mt-5 ' />
							{/* products */}
							<div className='d-flex'>
								<p className='w-25'>Products</p>
								<div className='w-75'>
									<div className='d-flex gap-3'>
										{/* products name */}
										<div className='w-75'>
											<p className='m-0'>Product</p>
											<Form.Select
												value={products.product_name}
												onChange={(e) =>
													setProducts((prev) => ({
														...prev,
														product_name: e.target.value,
													}))
												}
											>
												<option selected hidden>
													Product name
												</option>
												{productsList[0].products.map((item) => (
													<option
														key={item.product_name}
														value={item.product_name}
													>
														{item.product_name}
													</option>
												))}
											</Form.Select>
											{products.length === 0 ? (
												<p className='text-danger'>required</p>
											) : (
												''
											)}
										</div>

										{/* unit */}
										<div className='w-25'>
											<p className='m-0'>Unit</p>
											<Form.Select
												value={products.units?.[0].name}
												onChange={(e) =>
													setProducts((prev) => ({
														...prev,
														units: [{ ...prev.units[0], name: e.target.value }],
													}))
												}
											>
												<option selected hidden>
													Unit
												</option>
												{productsList[0].products[0].units.map((item) => (
													<option key={item.name} value={item.name}>
														{item.name}
													</option>
												))}
											</Form.Select>
										</div>
									</div>

									{/* Quantity, price & total price */}
									<div className='d-flex gap-3 mt-3'>
										{/* quantity */}
										<div className='w-25'>
											<p className='m-0'>Quantity</p>
											<Form.Control
												type='number'
												value={products.units?.[0].quantity}
												onChange={(e) =>
													setProducts((prev) => ({
														...prev,
														units: [
															{ ...prev.units[0], quantity: e.target.value },
														],
													}))
												}
											/>
										</div>

										{/* price */}
										<div className='w-25'>
											<p className='m-0'>Price</p>
											<Form.Control
												type='number'
												value={
													productsList[0].products.find(
														(item) =>
															item.product_name === products.product_name
													)?.units?.[0].price
												}
											/>
										</div>

										{/* total price */}
										<div className='w-50'>
											<p className='m-0 d-flex justify-content-end'>
												Total price
											</p>
											<Form.Control type='number' value={0}></Form.Control>
										</div>
									</div>
								</div>
							</div>
						</>
					)}

					<hr className='mt-5 ' />

					{/* cancel & confirm button */}
					<div className='d-flex justify-content-end gap-2'>
						<Button
							variant='light'
							onClick={() => {
								setName('');
								setDistCenter('');
								setPayment('');
								setExpired('');
								setNotes('');
								setProducts({
									product_name: '',
									units: [{ name: '', price: 0, quantity: 0 }],
								});
								// axios.post('api', {name, distCenter, payment, expired, notes, products})
							}}
						>
							CANCEL
						</Button>
						<Button
							variant='success'
							disabled={
								name === '' ||
								distCenter === '' ||
								payment === '' ||
								expired === ''
								// || products.length === 0
							}
						>
							CONFIRM
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
