package com.clothingstore.service.impl;

import com.clothingstore.entity.Cloth;
import com.clothingstore.entity.Order;
import com.clothingstore.entity.OrderItem;
import com.clothingstore.exception.ApiRequestException;
import com.clothingstore.repo.ClothRepository;
import com.clothingstore.repo.OrderItemRepository;
import com.clothingstore.repo.OrderRepository;
import com.clothingstore.service.OrderService;
import com.clothingstore.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.clothingstore.consts.ErrorMessage.ORDER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ClothRepository clothRepository;
    private final MailSender mailSender;
    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiRequestException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        Order order = getOrderById(orderId);
        return order.getOrderItems();
    }

    @Override
    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public Page<Order> getUserOrders(String email, Pageable pageable) {
        return orderRepository.findOrderByEmail(email, pageable);
    }

    @Override
    @Transactional
    public Order postOrder(Order order, Map<Long, Long> clothsId) {
        List<OrderItem> orderItemList = new ArrayList<>();
        System.out.println(clothsId);
        System.out.println(order);
        for (Map.Entry<Long, Long> entry : clothsId.entrySet()) {
            Optional<Cloth> clothOptional = clothRepository.findById(entry.getKey());
            if (clothOptional.isPresent()) {
                Cloth cloth = clothOptional.get();
                OrderItem orderItem = new OrderItem();
                orderItem.setCloth(cloth);
                orderItem.setAmount((cloth.getPrice() * entry.getValue()));
                orderItem.setQuantity(entry.getValue());
                orderItemList.add(orderItem);
                orderItemRepository.save(orderItem);
            } else {
                throw new ApiRequestException("Cloth not found for id: " + entry.getKey(), HttpStatus.NOT_FOUND);
            }
        }

        order.getOrderItems().addAll(orderItemList);
        orderRepository.save(order);

        String subject = "Order #" + order.getId();
        System.out.println("order"+subject);
        String template = "order-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("order", order);
        mailSender.sendMessageHtml(order.getEmail(), subject, template, attributes);

        return order;
    }


    @Override
    @Transactional
    public String deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiRequestException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));
        orderRepository.delete(order);
        return "Order deleted successfully";
    }
}
