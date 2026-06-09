package com.app.fitshake.presentation;

import com.app.fitshake.application.services.AuthServices;
import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.BeanInstanceSupplier;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link AuthController}.
 */
@Generated
public class AuthController__BeanDefinitions {
  /**
   * Get the bean instance supplier for 'authController'.
   */
  private static BeanInstanceSupplier<AuthController> getAuthControllerInstanceSupplier() {
    return BeanInstanceSupplier.<AuthController>forConstructor(AuthServices.class)
            .withGenerator((registeredBean, args) -> new AuthController(args.get(0)));
  }

  /**
   * Get the bean definition for 'authController'.
   */
  public static BeanDefinition getAuthControllerBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(AuthController.class);
    InstanceSupplier<AuthController> instanceSupplier = getAuthControllerInstanceSupplier();
    instanceSupplier = instanceSupplier.andThen(AuthController__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
