package iOSPushNotifications;

import com.notnoop.apns.APNS;
import com.notnoop.apns.ApnsService;
import java.util.*;

public class SendNotifications {
    ApnsService pushService = APNS.newService()
                   .withCert("/Users/anjana/Desktop/PhonegapPush_IOS/04_15_2016/ServerCertiP12.p12", "abc123")
                   .withSandboxDestination()
                   .build();
    
    void notify(String message){
            String payload = APNS.newPayload().alertBody(message).build();
            String token = "29ab94b7fbd0bb3ebfabc07d28436f37e91d2db45eb4bc2beed747544f4c9c01";
            pushService.push(token, payload);
            Map<String, Date> inactiveDevices = pushService.getInactiveDevices();
            for (String deviceToken : inactiveDevices.keySet()) {
                Date inactiveAsOf = inactiveDevices.get(deviceToken);
                System.out.println("Inactive device token : " +deviceToken);
                System.out.println("tried to send notification at : " +inactiveAsOf);
            }
            
    }
    public static void main(String[] args){
    	try
    	{
           SendNotifications object = new SendNotifications();
           object.notify("Notify my iPhone");
    	}
    	catch(Exception e)
    	{
    		System.out.println("Exception occured : " +e.getMessage());
    	}
    }
}
