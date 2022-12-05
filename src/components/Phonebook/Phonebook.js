import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { Container } from './PhoneBook.styled';

export default function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = formData => {
    const { name, number } = formData;

    if (checkName(name)) {
      alert(name + ' is already in contacts');
      return false;
    }

    const contact = {
      name: name,
      number: number,
      key: nanoid(),
    };

    setContacts(prevContacts => [...prevContacts, contact]);
    return true;
  };

  const checkName = name => {
    const normalisedFilter = name.toLocaleLowerCase();

    return contacts.some(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  const deleteContact = contactKey => {
    setContacts(contacts.filter(contact => contact.key !== contactKey));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getfilterContacts = () => {
    const normalisedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  return (
    <Container className="Phonebook_container">
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />
      <h2>Contacts</h2>
      {contacts.length !== 0 && (
        <>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            filterContacts={getfilterContacts()}
            deleteContact={deleteContact}
          />
        </>
      )}
    </Container>
  );
}
