import * as React from "react";
import { Form, Label, Segment, List } from "semantic-ui-react";
import PlacesAutocomplete from "react-places-autocomplete";
import { WrappedFieldProps } from "redux-form";

export interface AutocompleteInputProps
  extends WrappedFieldProps,
    HTMLInputElement {
  options: any;
  handleSelect?(city: string): void;
}

const AutocompleteInput: React.SFC<AutocompleteInputProps> = ({
  input: { onChange, onBlur, value },
  width,
  options,
  meta: { error, touched },
  placeholder,
  handleSelect,
  ...rest
}) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      onSelect={handleSelect}
      searchOptions={options}
      {...(rest as any)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Form.Field error={touched && !!error}>
          <input
            placeholder={placeholder}
            {...(getInputProps({
              placeholder,
              onBlur,
            }) as any)}
          />
          {touched && !!error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          {suggestions.length > 0 && (
            <Segment
              style={{ position: "absolute", zIndex: 1000, marginTop: 0 }}
            >
              {loading && <div>Loading...</div>}
              <List selection>
                {suggestions.map((suggestion) => (
                  <List.Item {...getSuggestionItemProps(suggestion)}>
                    <List.Header>
                      {suggestion.formattedSuggestion.mainText}
                    </List.Header>
                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </Form.Field>
      )}
    </PlacesAutocomplete>
  );
};

export { AutocompleteInput };
