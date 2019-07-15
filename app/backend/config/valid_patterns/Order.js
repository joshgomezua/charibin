'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  order: {
    _id: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      },
    },

    __v: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      },
    },

    buyer: {
      type: 'object',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      },

      attributes: {
        name: {
          type: 'string',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        email: {
          type: 'string',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        phone: {
          type: 'string',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        birthDate: {
          type: 'timestamp',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        address: {
          type: 'string',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        city: {
          type: 'string',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        zipCode: {
          type: 'string',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        }
      }
    },

    stripeChargeId: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    selected: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    deselected: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    finalSelection: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    finalDestination: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    date: {
      type: 'object',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      },

      attributes: {
        start: {
          type: 'timestamp',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        end: {
          type: 'timestamp',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        }
      }
    },

    quantity: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    ticketPrice: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    isTimeSelected: {
      type: 'boolean',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    deselectionPrice: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    totalPrice: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    discount: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    sent: {
      type: 'boolean',
      required: false,
      permission: {
        create: [],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    createdAt: {
      type: 'timestamp',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    user: {
      type: 'object',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      },

      attributes: {
        name: {
          type: 'string',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        email: {
          type: 'email',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR],
            destroy: [ROLE.ADMINISTRATOR],
          },
          minLength: 5,
          maxLength: 40,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/
        },

        role: {
          type: 'string',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR],
            destroy: [ROLE.ADMINISTRATOR],
          },
        },

        active: {
          type: 'boolean',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR]
          }
        },

        isDeleted: {
          type: 'boolean',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR]
          }
            
        },

        password: {
          type: 'password',
          required: false,
          permission: {
            create: [],
            update: [],
            find: [],
            destroy: [],
          },
          pattern: /^(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-](?=.*[0-9])(?=.*[a-z]).{7,}$/
        },
      }
    }
  }
};
