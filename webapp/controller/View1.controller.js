sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller, MessageBox, MessageToast, Filter, FilterOperator, Sorter) => {
    "use strict";

    return Controller.extend("zproductslocal.controller.View1", {
        onInit() {
            var oMaterialData = {

            }; // Object
            var MaterialJSON = new sap.ui.model.json.JSONModel(oMaterialData); //Create JSON from Object
            this.getView().setModel(MaterialJSON, "MaterialModel") //setting JSONModel to View By using MaterialModel name
        },
        onPrdIdVH: function () {
            if (!this.PrdIdDialog) {
                this.PrdIdDialog = sap.ui.xmlfragment("zproductslocal.fragments.PrdIdVH", this);
                this.getView().addDependent(this.PrdIdDialog)
            }
            this.PrdIdDialog.open();
        },
        onPressPrdidClose: function () {
            if (this.PrdIdDialog) {
                this.PrdIdDialog.close();
            }
            if (this.PrdNameDialog) {
                this.PrdNameDialog.close();
            }
        },
        onPrdNameVH: function () {
            if (!this.PrdNameDialog) {
                this.PrdNameDialog = sap.ui.xmlfragment("zproductslocal.fragments.PrdNameVH", this);
                this.getView().addDependent(this.PrdNameDialog)
            }
            this.PrdNameDialog.open();
        },
        onPressValidate() {
            var idnumber = this.getView().byId("idNumber").getValue();
            var firstname = this.getView().byId("idFirstName").getValue();
            var lastname = this.getView().byId("idLastName").getValue();

            if (idnumber !== "") {
                this.getView().byId("idNumber").setValueState("Success")
                MessageToast.show("ID Number Validated");
            } else {
                this.getView().byId("idNumber").setValueState("Error")
                this.getView().byId("idNumber").setValueStateText("ID Number is Empty")
                MessageToast.show("ID Number is Empty");
            }
        },
        onPressSearch: function () {
            let prdidvalue = this.getView().byId("idprdid").getValue(),
                prdnamevalue = this.getView().byId("idprdname").getValue(),
                prdprice = this.getView().byId("idprdprice").getValue(),
                statusvalue = this.getView().byId("idstatus")._getSelectedItemText(),
                aFilters = [];
            if (prdidvalue !== "") {
                // let prdidFilter = new Filter("prdid", FilterOperator.EQ, prdidvalue);
                aFilters.push(new Filter("prdid", FilterOperator.EQ, prdidvalue));
            }
            if (prdnamevalue !== "") {
                aFilters.push(new Filter("prdname", FilterOperator.EQ, prdnamevalue));
            }

            if (statusvalue !== "") {
                aFilters.push(new Filter("prdstatus", FilterOperator.EQ, statusvalue))
            }

            let table = this.getView().byId("idProductsTable");
            table.getBinding("items").filter(aFilters);
        },
        onPressSort: function () {
            let prdidsort = new Sorter("prdid", true);

            let table = this.getView().byId("idProductsTable");
            table.getBinding("items").sort(prdidsort)
        },
        onPressRow: function(oEvent){
            var selectedObj = oEvent.getSource().getBindingContext().getObject();
            var prdid = selectedObj.prdid
            this.getView().byId("idprdid").setValue(prdid);
            // this.onPressPrdidClose();
            this.PrdIdDialog.close();
        }
    });
});