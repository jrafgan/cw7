import React, {Component} from 'react';
import './App.css';
import Food from "./components/Food";
import HamBurgerImage from './assets/hamBurger.png';
import CheeseBurgerImage from './assets/cheeseBurger.png';
import FriesImage from './assets/fries.jpeg';
import CoffeeImage from './assets/coffee.jpeg';
import TeaImage from './assets/tea.png';
import ColaImage from './assets/cola.jpeg';

const foodArr = [
    {name: "Hamburger", price: 80, src: HamBurgerImage},
    {name: "Cheeseburger", price: 90, src: CheeseBurgerImage},
    {name: "Fries", price: 45, src: FriesImage},
    {name: "Coffee", price: 70, src: CoffeeImage},
    {name: "Tea", price: 50, src: TeaImage},
    {name: "Cola", price: 40, src: ColaImage}
];

class App extends Component {
    state = {
        sign: {part1: "Order is Empty!", part2: "Please Add some items!"},
        orderList: [],
        total: 0
    };

    addItem(event) {
        let copy = this.state;
        const name = event.target.className;
        const index = foodArr.findIndex(item => item.name === name);
        const index2 = this.state.orderList.findIndex(item => item.name === name);
        copy.sign.part1 = "";
        copy.sign.part2 = "";
        let price = foodArr;
        price = price[index].price;
        if (copy.orderList.length > 0 && index2 > -1) {
            copy.orderList[index2].count++;
        } else {
            copy.orderList.push({name: name, price: price, count: 1});
        }
        copy.total += price;
        this.setState({copy});
    }

    deleteItem(event) {
        let copy = this.state;
        const name = event.target.className;
        const index = this.state.orderList.findIndex(item => item.name === name);
        if (index > -1 && copy.orderList[index].count > 0) {
            const price = copy.orderList[index].price;
            copy.orderList[index].count--;
            if (copy.orderList[index].count === 0) {
                copy.orderList.splice(index, 1);
            }
            copy.total -= price;
        }
        this.setState({copy});
    }

    render() {
        return (
            <div className="App mainDiv">
                <div className="orderDetails"><p>Order Details</p>
                    <div className="sign">{this.state.sign.part1}<p>{this.state.sign.part2}</p></div>
                    {this.state.orderList.map((order, index) => {
                        return (
                            <div key={index} className="orderItem">{order.name + " X " + order.count}
                                <p>{order.price * order.count + " KGS"}</p>
                                <button className={order.name} onClick={(event) => {
                                    this.deleteItem(event)
                                }}>delete
                                </button>
                            </div>
                        )
                    })}
                    <div className="total">Total:{this.state.total} </div>
                </div>
                <div className="foodList"><p>Food List</p>
                    <div className="main_block">
                        {foodArr.map((item, index) => {
                            return <Food name={item.name} id={index} key={index} price={item.price} src={item.src}
                                         onClickAdd={(event) => {
                                             this.addItem(event)
                                         }}/>
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
