import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants

function OrderScreen({ match, history }) {
  const orderId = match.params.id
  const dispatch = useDispatch()


  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
}
  const addPayPalScript = () => {
    const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

      if (!userInfo) {
          history.push('/login')
      }

      if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
        dispatch({ type: ORDER_PAY_RESET })
        dispatch({ type: ORDER_DELIVER_RESET })

        dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
        if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
    }
}, [dispatch, order, orderId, successPay, successDeliver])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  }

  return (
    <div>
      
    </div>
  )
}

export default OrderScreen
