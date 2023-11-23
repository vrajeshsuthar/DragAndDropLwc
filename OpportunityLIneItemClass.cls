public class OpportunityLIneItemClass {

@AuraEnabled
    public static List<OpportunityLineItem>  getRealtedProduct(ID recordId){       
        List<OpportunityLineItem> oppProductList= [SELECT Id,Product2.Name,OpportunityId,Sort_Order__c,Description,
                                                  	Additional_Placement_Details__c from 
                                                   OpportunityLineItem where OpportunityId =: recordId ORDER BY Sort_Order__c ASC];
		System.debug('--oppProductList---'+oppProductList);
        return oppProductList;
    }
    
    @AuraEnabled
    public static List<OpportunityLineItem> updateRealtedProduct(ID recordId,List<OpportunityLineItem> updatedata){      
        //List<OpportunityLineItem> oppupdatedata= [SELECT Id,Name,OpportunityId,End_Date__c,UnitPrice,Sort_Order__c,SortOrder from OpportunityLineItem where OpportunityId =: recordId ORDER BY Sort_Order__c ASC];
        System.debug('--updateRealtedProduct---'+updatedata);
        Integer index= 1;
        for(OpportunityLineItem product:updatedata){ 
            system.debug(product.id +' *** '+ product.Name);
            product.SortOrder=index;
            product.Sort_Order__c=index;
            index=index+1; 
        }        
        update updatedata;       
        return updatedata;
    }
    
    
}