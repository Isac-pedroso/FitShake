package com.app.fitshake.application.services;

import com.app.fitshake.domain.repositories.UsuarioRepository;
import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.BeanInstanceSupplier;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.InstanceSupplier;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link UsuarioServices}.
 */
@Generated
public class UsuarioServices__BeanDefinitions {
  /**
   * Get the bean instance supplier for 'usuarioServices'.
   */
  private static BeanInstanceSupplier<UsuarioServices> getUsuarioServicesInstanceSupplier() {
    return BeanInstanceSupplier.<UsuarioServices>forConstructor(UsuarioRepository.class)
            .withGenerator((registeredBean, args) -> new UsuarioServices(args.get(0)));
  }

  /**
   * Get the bean definition for 'usuarioServices'.
   */
  public static BeanDefinition getUsuarioServicesBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(UsuarioServices.class);
    InstanceSupplier<UsuarioServices> instanceSupplier = getUsuarioServicesInstanceSupplier();
    instanceSupplier = instanceSupplier.andThen(UsuarioServices__Autowiring::apply);
    beanDefinition.setInstanceSupplier(instanceSupplier);
    return beanDefinition;
  }
}
