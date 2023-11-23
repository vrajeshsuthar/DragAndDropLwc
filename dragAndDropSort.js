import { LightningElement, wire, track, api } from "lwc";
import getRealtedProduct from "@salesforce/apex/OpportunityLIneItemClass.getRealtedProduct";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import updateRealtedProduct from "@salesforce/apex/OpportunityLIneItemClass.updateRealtedProduct";


export default class DragandDropTable extends LightningElement {

  @track updatedata = [];
  @track sortBy;
  @track dragStart;
  @track ElementList = [];
  oppId;

  //set method for recordId
  @api set recordId(value) {
    this.oppId = value;
    console.log(this.oppId)
    //method for data get 
    getRealtedProduct({ recordId: this.oppId })
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          this.ElementList.push(
            { record: result[i], number: i + 1 }
          );
        }

      })
      .catch((error) => {
        console.log("###Error : " + error.body.message);
      });

  }
  get recordId() {
    return this.oppId;
  }

  SaveRecord() {
    let sorteddata = this.ElementList;
    let newSortedData = [];
    this.ElementList.forEach((element) => {
      newSortedData.push(element.record);
    });

    let stringifydata = JSON.stringify(newSortedData);
    console.log('Update data index' + stringifydata);
    updateRealtedProduct({ recordId: this.oppId, updatedata: stringifydata })
      .then(result => {
        console.log('-----------result----------' + JSON.stringify(result));
        const evt = new ShowToastEvent({
          message: 'Sort order was saved.',
          variant: 'success',
          mode: 'dismissable',
        });
        this.dispatchEvent(evt);
      }).catch(error => {
        this.error = error;
      })

    this.dispatchEvent(new CloseActionScreenEvent());
  }

  CancelRecord() {
    // this.isShowModal = false;
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  DragStart(event) {
    this.dragStart = event.target.title;
    //event.target.classList.add("drag");
  }


  DragOver(event) {
    event.preventDefault()
    event.target.classList.add("drag");
    return false;
  }

  DragLeave(event) {
    event.target.classList.remove('drag'); // this / e.target is previous target element.
    event.target.ElementList[0];
    event.DragLeave.Array;
    
  }

  DragValName(event){
    navigator.geolocation.lat
  }

  Drop(event) {
    event.stopPropagation();
    event.target.classList.remove('drag');
    const DragValName = this.dragStart;
    const DropValName = event.target.title;

    console.log("drop value name-----" + typeof DropValName);
    if (DragValName === DropValName) {
      return false;
    }
    const index = DropValName;
    const currentIndex = DragValName;
    const newIndex = DropValName;

    console.log("only index-----" + index);
    console.log("current index------" + currentIndex);
    console.log("new index--------" + typeof newIndex);

    if (newIndex !== '') {
      console.log("inside if");
      Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
      };

      this.ElementList.move(currentIndex, newIndex);

      let newDisplayIndex = 1;
      this.ElementList.forEach((element) => {
        element.number = newDisplayIndex;
        newDisplayIndex = newDisplayIndex + 1;
      });

    }
    else {
      return false;
    }



    console.log('this.ElementList------' + JSON.stringify(this.ElementList));


  }
}