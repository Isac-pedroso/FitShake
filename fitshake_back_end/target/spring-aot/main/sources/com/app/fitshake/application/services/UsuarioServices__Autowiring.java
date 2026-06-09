package com.app.fitshake.application.services;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.aot.AutowiredFieldValueResolver;
import org.springframework.beans.factory.support.RegisteredBean;

/**
 * Autowiring for {@link UsuarioServices}.
 */
@Generated
public class UsuarioServices__Autowiring {
  /**
   * Apply the autowiring.
   */
  public static UsuarioServices apply(RegisteredBean registeredBean, UsuarioServices instance) {
    AutowiredFieldValueResolver.forRequiredField("usuarioRepository").resolveAndSet(registeredBean, instance);
    return instance;
  }
}
