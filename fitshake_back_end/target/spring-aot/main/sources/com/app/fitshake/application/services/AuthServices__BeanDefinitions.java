package com.app.fitshake.application.services;

import com.app.fitshake.domain.repositories.UsuarioRepository;
import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.BeanInstanceSupplier;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link AuthServices}.
 */
@Generated
public class AuthServices__BeanDefinitions {
  /**
   * Get the bean instance supplier for 'authServices'.
   */
  private static BeanInstanceSupplier<AuthServices> getAuthServicesInstanceSupplier() {
    return BeanInstanceSupplier.<AuthServices>forConstructor(UsuarioRepository.class)
            .withGenerator((registeredBean, args) -> new AuthServices(args.get(0)));
  }

  /**
   * Get the bean definition for 'authServices'.
   */
  public static BeanDefinition getAuthServicesBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(AuthServices.class);
    beanDefinition.setInstanceSupplier(getAuthServicesInstanceSupplier());
    return beanDefinition;
  }
}
