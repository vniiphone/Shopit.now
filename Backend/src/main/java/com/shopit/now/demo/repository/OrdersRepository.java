package com.shopit.now.demo.repository;

import com.shopit.now.demo.bean.register.modules.orders.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders,Integer> {

    @Query("select o from Orders o where o.user.id=:uid ORDER BY o.orderStatus.shipped ASC , o.orderDate DESC")
    List<Orders> getALlOrders(@Param("uid") int uid);

    @Query("select count(o) from Orders o")
    int noOfOrders();

    @Query("select o from Orders o where o.orderStatus.cancelled=0 and o.orderStatus.delivered=0 order by o.orderStatus.shipped ASC , o.orderDate desc")
    List<Orders> getAdminOrders();

}
